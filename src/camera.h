#ifndef CAMERA_H
#define CAMERA_H

#include "helper.h"

class camera {
public:

    camera(double aspect_ratio) {
        auto viewport_height = 2.0;
        auto viewport_width = aspect_ratio * viewport_height;
        auto focal_length = 1.0; // dist between 'eye' and virtual screen

        origin = {0, 0, 1.2};

        horizontal = {viewport_width, 0, 0};
        vertical = {0, viewport_height, 0};

        lower_left_corner = origin - horizontal/2 - vertical/2 - vec3(0, 0, focal_length);
    }

    ray get_ray(double u, double v) const {
        // the direction isn't normalised, as it shouldn't be necessary, but basically, it's a ray going from,
        // the direction of the lower left corner, and the `- origin` bit is for the case when origin is not
        // at (0, 0, 0), so that the direction vector doesn't have any random offset
        return { origin, lower_left_corner + u*horizontal + v*vertical - origin };
    }
private:
    point3 origin{};
    vec3 horizontal{};
    vec3 vertical{};
    point3 lower_left_corner{};
};

#endif // CAMERA_H