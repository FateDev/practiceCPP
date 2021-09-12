#ifndef HITTABLE_H
#define HITTABLE_H

#include "ray.h"

struct hit_record {
    point3 p{}; // point at which hit happened
    double t{}; // value on dir vector line at which hit occurred

    bool front_face{};
    vec3 normal{}; // normal at hit
    inline void set_face_normal(const ray &r, const vec3 &outward_normal){
        front_face = dot(r.direction(), outward_normal) > 0.0; // if ray coming from inside, then positive
        normal = front_face ? -outward_normal : outward_normal; // if from inside, then normal is -outward_normal
    }
};

class hittable {
public:
    virtual bool hit(const ray &r, double t_min, double t_max, hit_record &rec) const = 0;
};

#endif // HITTABLE_H