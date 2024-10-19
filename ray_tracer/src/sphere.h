#ifndef SPHERE_H
#define SPHERE_H

#include <utility>

#include "hittable.h"

class sphere : public hittable {
public:
    sphere() = default;
    sphere(point3 center, double radius, shared_ptr<material> mat_ptr)
        : center(center), radius(radius), mat_ptr(std::move(mat_ptr)) {};

    bool hit(const ray &r, double t_min, double t_max, hit_record &rec) const override;
public:
    point3 center{};
    double radius{};
    shared_ptr<material> mat_ptr{};
};

bool sphere::hit(const ray &r, double t_min, double t_max, hit_record &rec) const {
    vec3 dist_sphere_center_ray_origin = r.origin() - center;
    double a = r.direction().length_squared();
    double b_half = dot(r.direction(), dist_sphere_center_ray_origin);
    double c = dist_sphere_center_ray_origin.length_squared() - radius*radius;

    double discriminant = b_half*b_half - a*c;
    if(discriminant < 0) return false;

    auto sqrt_discriminant = sqrt(discriminant);

    auto root = (-b_half - sqrt_discriminant) / a; // try minus root since further in screen
    if(root < t_min || t_max < root){
        root = (-b_half + sqrt_discriminant) / a; // try plus, not as far in screen but maybe in range
        if(root < t_min || t_max < root)
            return false;
    }

    rec.t = root;
    rec.p = r.at(root);

    vec3 outward_normal = (rec.p - center) / radius; // since the magnitude of (rec.p - center) is radius, as lies on surface
    rec.set_face_normal(r, outward_normal);

    rec.mat_ptr = mat_ptr;

    return true;
}


#endif // SPHERE_H