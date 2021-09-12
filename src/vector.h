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

#endif //VECTOR_H
