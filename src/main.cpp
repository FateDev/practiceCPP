#include <iostream>

#include "helper.h"

#include "colour.h"
#include "sphere.h"
#include "hittable_list.h"
#include "camera.h"

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

    // camera
    camera cam{aspect_ratio};
    constexpr int samples_per_pixel = 1;

    // setup hittable world
    hittable_list world{}; // when we pass it to ray_col it is cast to its public base - hittable
    world.add(make_shared<sphere>(point3{ 0, 0, -1},0.5));
    world.add(make_shared<sphere>(point3{ 0, -100.5, -1},100));

    // render
    std::cout << "P3\n" << width << " " << height << "\n255\n";

    for(int j = height-1; j >= 0; j--){
        char buff[20];
        sprintf(buff, "%*d", 4, j);
        std::cerr << "\rScanlines: " << buff << std::flush;

        for(int i = 0; i < width; i++){
            // get u/v coordinates in the range 0-1
            colour pix_col{};

            for(int sample = 0; sample < samples_per_pixel; sample++){
                auto u = static_cast<double>(i + random_double()) / (width-1);
                auto v = static_cast<double>(j + random_double()) / (height-1);
                auto r = cam.get_ray(u, v);

                pix_col += ray_col(r, world);
            }

            write_colour(std::cout, pix_col, samples_per_pixel);
        }
    }

    std::cerr << "\nDone.\n";
}