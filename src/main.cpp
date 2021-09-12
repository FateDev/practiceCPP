#include <iostream>

#include "helper.h"

#include "colour.h"
#include "sphere.h"
#include "hittable_list.h"

colour ray_col(const ray& r, const hittable &world){ // world could be a shape, or hittable_list, since abstract class
    hit_record rec;
    if(world.hit(r, 0, infinity, rec))
        return 0.5 * (rec.normal + colour(1,1,1));

    vec3 unit_dir = unit_vector(r.direction());
    double t = 0.5 * (unit_dir.y() + 1.0); // to be in the range 0 < x < 1
    return (1 - t)*colour(1, 1, 1) + (t)*colour(0.5, 0.7, 1.0);
}

int main(){
    // setup sizes
    constexpr auto aspect_ratio = 16.0 / 9.0;
    const int width = 500;
    const int height = static_cast<int>( width / aspect_ratio);

    // setup hittable world
    hittable_list world{}; // when we pass it to ray_col it is cast to its public base - hittable
    world.add(make_shared<sphere>(point3{ 0, 0, -1},0.5));
    world.add(make_shared<sphere>(point3{ 0, -100.5, -1},100));

    // camera
    constexpr auto viewport_height = 2.0;
    constexpr auto viewport_width = aspect_ratio * viewport_height;
    constexpr auto focal_length = 1.0; // dist between 'eye' and virtual screen

    vec3 origin{0, 0, 0};

    vec3 horizontal{viewport_width, 0, 0};
    vec3 vertical{0, viewport_height, 0};

    auto lower_left_corner = origin - horizontal/2 - vertical/2 - vec3(0, 0, focal_length);

    // render
    std::cout << "P3\n" << width << " " << height << "\n255\n";

    for(int j = height-1; j >= 0; j--){
        char buff[20];
        sprintf(buff, "%*d", 4, j);
        std::cerr << "\rScanlines: " << buff << std::flush;

        for(int i = 0; i < width; i++){
            auto u = static_cast<double>(i) / (width-1);
            auto v = static_cast<double>(j) / (height-1);

            // the direction isn't normalised, as it shouldn't be necessary, but basically, it's a ray going from,
            // the direction of the lower left corner, and the `- origin` bit is for the case when origin is not
            // at (0, 0, 0), so that the direction vector doesn't have any random offset
            ray r{ origin, lower_left_corner + u*horizontal + v*vertical - origin };
            colour pix_col = ray_col(r, world);
            write_colour(std::cout, pix_col);
        }
    }

    std::cerr << "\nDone.\n";
}