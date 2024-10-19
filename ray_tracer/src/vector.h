#ifndef VECTOR_H
#define VECTOR_H

#include <cmath>

class vec3;
using point3 = vec3;
using colour = vec3;

class vec3 {
public:
    double vec[3]{};
public:
    vec3() {}
    vec3(double i, double j, double k){
        vec[0] = i;
        vec[1] = j;
        vec[2] = k;
    }

    double operator[](int idx) const { return vec[idx]; }
    double &operator[](int idx) { return vec[idx]; }
    vec3 operator-() const { return { -vec[0], -vec[1], -vec[2] }; }

    double x() { return vec[0]; }
    double y() { return vec[1]; }
    double z() { return vec[2]; }

    vec3 &operator+=(const vec3 &v){
        vec[0] += v.vec[0];
        vec[1] += v.vec[1];
        vec[2] += v.vec[2];
        return *this;
    }

    vec3 &operator*=(const double s){
        vec[0] *= s;
        vec[1] *= s;
        vec[2] *= s;
        return *this;
    }

    vec3 &operator/=(const double s){
        return *this *= (1/s);
    }

    double length_squared() const {
        return vec[0]*vec[0] + vec[1]*vec[1] + vec[2]*vec[2];
    }

    double length() const {
        return sqrt(length_squared());
    }

    inline static vec3 random(){
        return { random_double(), random_double(), random_double() };
    }

    inline static vec3 random(double min, double max){
        return { random_double(min, max), random_double(min, max), random_double(min, max) };
    }

    bool near_zero() const{
        const auto s = 1e-8; // threshold to be considered near zero
        return (fabs(vec[0]) < s) && (fabs(vec[1]) < s) && (fabs(vec[2]) < s); // return true if close to zero
    }
};

inline std::ostream &operator<<(std::ostream &out, const vec3 &u){
    return out << u.vec[0] << ' ' << u.vec[1] << ' ' << u.vec[2];
}

inline vec3 operator-(const vec3 &u, const vec3 &v){
    return { u[0]-v[0], u[1]-v[1], u[2]-v[2] };
}

inline vec3 operator+(const vec3 &u, const vec3 &v){
    return { u[0]+v[0], u[1]+v[1], u[2]+v[2] };
}

inline vec3 operator*(const vec3 &u, double scalar){
    return { u[0]*scalar, u[1]*scalar, u[2]*scalar };
}

inline vec3 operator*(double scalar, const vec3 &u){
    return { u[0]*scalar, u[1]*scalar, u[2]*scalar };
}

inline vec3 operator/(const vec3 &u, double scalar){
    return { u[0]/scalar, u[1]/scalar, u[2]/scalar };
}

inline double dot(const vec3 &u, const vec3 &v){
    return u[0]*v[0] + u[1]*v[1] + u[2]*v[2];
}

inline vec3 cross(const vec3 &u, const vec3 &v){
    return {
        u[1]*v[2] - u[2]*v[1],
        u[2]*v[0] - u[0]*v[2],
        u[0]*v[1] - u[1]*v[0]
    };
}

inline vec3 operator*(const vec3 &u, const vec3 &v){
    return { u.vec[0]*v.vec[0], u.vec[1]*v.vec[1], u.vec[2]*v.vec[2] };
    // Hadamard product - element wise multiplication
}

inline vec3 unit_vector(const vec3 &u){
    return u/u.length();
}

inline vec3 random_in_unit_sphere(){
    // this has a distribution scaled by cos^3(phi), not Lambertian reflectance
    while(true){
        auto point = vec3::random(-1, 1);
        if(point.length_squared() >= 1) continue;
        return point;
    }
}

inline vec3 random_unit_vector(){
    return unit_vector(vec3::random(-1, 1));
    // normalising, rather than picking points over and over until you pick a point in a unit sphere
    // yields Lambertian reflection, using the Lambertian distribution (random distribution scaled by cos(phi),
    // rather than by cos^3(phi) )
}

inline vec3 random_in_hemisphere(const vec3 &normal){
    vec3 point_in_unit_sphere = random_in_unit_sphere();
    if(dot(normal, point_in_unit_sphere) > 0){
        return point_in_unit_sphere;
    }else{
        return -point_in_unit_sphere;
    }
}

inline vec3 reflect(const vec3 &v, const vec3 &normal){
    return v + 2 * dot(-v, normal) * normal;
    // add 2x the projection of -v onto the normal to get the reflected ray
    // equivalent to rotating however 2x incidence angle clockwise about point of intersection of ray
}

inline vec3 refract(const vec3 &uv, const vec3 &n, double eta_i_over_eta_t){
    // https://graphics.stanford.edu/courses/cs148-10-summer/docs/2006--degreve--reflection_refraction.pdf
    // perp/parallel to the normal, magnitude of all vectors is 1
    // diagram used for the derivation is the same as in the pdf linked above
    // n_1 * sin(theta_i) = n_2 * sin(theta_r)
    // sin(theta_i)=|r_incident_perp|/|r_incident|, and sin(theta_r)=|r_out_perp|/|r_out|
    // so |r_out_perp|=n1/n2*|r_incident_perp|
    // and since r_out_perp and r_incident_perp are parallel and in the same direction:
    // --> r_out_perp = n1/n2*r_incident_perp
    // r_incident_perp = r_incident - dot(-r_incident, normal) * ( -normal ) - to get the bit perpendicular to the normal
    // so r_incident_perp = r_incident + cos(theta_i)*normal
    // so r_out_perp = n1/n2*(r_incident + cos(theta_i)*normal)
    auto cos_theta_i = fmin(dot(-uv, n), 1.0); // uv and normal are in opposite directions, so incident angle is with -uv
    vec3 r_out_perp = eta_i_over_eta_t * (uv + cos_theta_i*n); // perpendicular component of refracted ray
    // |r_out|^2 = |r_out_perp|^2 + |r_out_parallel|^2
    // 1 = |r_out_perp|^2 + |r_out_parallel|^2
    // |r_out_parallel|^2 = 1 - |r_out_perp|^2
    // |r_out_parallel| = -sqrt(1 - |r_out_perp|^2) - negative since in the diagram it can be though as pointing down
    // normal*|r_out_parallel| = -sqrt(1 - |r_out_perp|^2)*normal
    // r_out_parallel = -sqrt(1 - |r_out_perp|^2)*normal
    // --> since the normal was of magnitude 1 and parallel to r_out_parallel, multiplying the magnitude of
    //     r_out_parallel by it, simply made it into the r_out_parallel vector
    vec3 r_out_parallel = -sqrt(fabs(1.0 - r_out_perp.length_squared())) * n;
    return r_out_perp + r_out_parallel; // the final refracted ray
}

inline vec3 random_in_unit_disk() {
    while(true) {
        auto p = vec3(random_double(-1, 1), random_double(-1, 1), 0); // disk at z = 0
        if(p.length_squared() >= 1) continue; // must be in the unit sphere
        return p;
    }
}

#endif //VECTOR_H
