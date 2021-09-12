#ifndef HELPER_H
#define HELPER_H

#include <cmath>
#include <limits>
#include <memory>

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

// common headers

#include "ray.h"
#include "vector.h"

#endif // HELPER_H