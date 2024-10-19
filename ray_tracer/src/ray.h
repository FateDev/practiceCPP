#ifndef RAY_H
#define RAY_H

#include "vector.h"

class ray {
public:
    vec3 orig{};
    vec3 dir{};
public:
    ray () = default;
    ray (const vec3 &orig, const vec3 &dir) : orig(orig), dir(dir) {}

    point3 origin() const { return orig; }
    vec3 direction() const { return dir; }

    point3 at(double s) const{
        return orig + dir * s;
    }
};

#endif //RAY_H
