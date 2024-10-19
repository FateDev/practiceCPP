#ifndef CAMERA_H
#define CAMERA_H

#include "helper.h"

class camera {
public:
    camera(const point3 &look_from, const point3 &look_at, const vec3 &vup, double aspect_ratio,
           double vertical_fov_angle, double aperture, double focus_dist) {
        if(vertical_fov_angle >= 180){
            std::cerr << "Please enter an FOV angle of less than 180 degrees\n";
            std::exit(-1);
        }

        auto viewport_height = 2.0 * tan( (vertical_fov_angle*pi/180) / 2 );
        auto viewport_width = aspect_ratio * viewport_height;

        w = unit_vector(look_from - look_at); // vector pointing towards look_at - kind of becomes focal length
        u = unit_vector(cross(vup, w)); // vector orthogonal to both w and the up vector
        v = cross(w, u); // vector orthogonal to the previous 2 - so these 3 can be used as basis

        origin = look_from;

        // multiplies by focus_dist, since the focus_dist is the distance from the lens (random unit disk) to the
        // focus plane, and the chunk of the focus plane which appears in the picture at all depends on the focus_dist,
        // higher focus_dist means a greater area is seen, and vice versa
        horizontal = focus_dist * viewport_width * u;
        vertical = focus_dist * viewport_height * v;
        lower_left_corner = origin - horizontal/2 - vertical/2 - w * focus_dist;

        lens_radius = aperture / 2;
        // aperture is being passed as the diameter of the lens/hole for the lens to receive light through,
        // so lens radius is half that
    }

    ray get_ray(double s, double t) const {
        // the direction isn't normalised, as it shouldn't be necessary, but basically, it's a ray going from,
        // the direction of the lower left corner, and the `- origin` bit is for the case when origin is not
        // at (0, 0, 0), so that the direction vector doesn't have any random offset, same for the `offset` vector

        // larger radius implies larger aperture in a real camera
        vec3 random_origin = lens_radius * random_in_unit_disk();
        vec3 offset = u * random_origin.x() + v * random_origin.y(); // random offset to simulate depth of field

        return { origin + offset, lower_left_corner + s*horizontal + t*vertical - origin - offset };
    }
private:
    point3 origin{};
    vec3 horizontal{};
    vec3 vertical{};
    point3 lower_left_corner{};

    vec3 u, v, w; // the orthogonal basis vectors
    double lens_radius;
};

#endif // CAMERA_H