#ifndef CAMERA_H
#define CAMERA_H

#include "helper.h"

class camera {
public:
    camera(point3 look_from, point3 look_at, vec3 vup, double aspect_ratio, double vertical_fov_angle) {
        if(vertical_fov_angle >= 180){
            std::cerr << "Please enter an FOV angle of less than 180 degrees\n";
            std::exit(-1);
        }

        auto viewport_height = 2.0 * tan( (vertical_fov_angle*pi/180) / 2 );
        auto viewport_width = aspect_ratio * viewport_height;

        auto w = unit_vector(look_from - look_at); // vector pointing towards look_at - kind of becomes focal length
        auto u = unit_vector(cross(vup, w)); // vector orthogonal to both w and the up vector
        auto v = cross(w, u); // vector orthogonal to the previous 2 - so these 3 can be used as basis

        origin = look_from;
        horizontal = viewport_width * u;
        vertical = viewport_height * v;
        lower_left_corner = origin - horizontal/2 - vertical/2 - w;
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