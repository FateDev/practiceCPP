#ifndef HELPER_H
#define HELPER_H

#include <cmath>
#include <limits>
#include <memory>
#include <random>

// usings

using std::make_shared;
using std::shared_ptr;
using std::sqrt;

// constants

constexpr double infinity = std::numeric_limits<double>::infinity();
constexpr double pi = 3.1415926535897932385;

// helper functions

inline double deg_to_rads(double degs) {
    return (degs * pi) / 180.0;
}

inline double random_double(){
    static std::uniform_real_distribution<double> distribution(0.0, 1.0);
    static std::mt19937 generator{};
    return distribution(generator);
}

inline double random_double(double min, double max){
    return min + (max - min) * random_double();
}

inline double clamp(double val, double min, double max){
    if (val < min) return min;
    if (val > max) return max;
    return val;
}

// common headers

#include "ray.h"
#include "vector.h"

#endif // HELPER_H