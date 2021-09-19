#include <iostream>

#include "helper.h"

#include "material.h"

#include "colour.h"
#include "sphere.h"
#include "hittable_list.h"
#include "camera.h"

colour ray_col(const ray& r, const hittable &world, int depth){ // world could be a shape, or hittable_list, since abstract class
    if(depth <= 0)
        return { 0, 0, 0 };

    hit_record rec;
    if(world.hit(r, 0.01, infinity, rec)){
        ray scattered{};
        colour attenuation{};

        if(rec.mat_ptr->scatter(r, rec, attenuation, scattered))
            return attenuation * ray_col(scattered, world, depth-1); // attenuates the returning colour

        return { 0, 0, 0 };
    }

    vec3 unit_dir = unit_vector(r.direction());
    double t = 0.5 * (unit_dir.y() + 1.0); // to be in the range 0 < x < 1
    return (1 - t)*colour(1, 1, 1) + (t)*colour(0.5, 0.7, 1.0);
}

int main(){

    // setup
    constexpr int max_depth = 50;
    constexpr auto aspect_ratio = 16.0 / 9.0;
    const int width = 1920;
    const int height = static_cast<int>( width / aspect_ratio);

    // camera
    const point3 look_from(5,10,10);
    const point3 look_at(0,0,-1);
    const vec3 v_up(0,1,0);
    auto dist_to_focus = (look_from-look_at).length();
    auto aperture = 0.7;
    camera cam(look_from, look_at, v_up, aspect_ratio, 20, aperture, dist_to_focus);

    constexpr int samples_per_pixel = 50;

    // materials
    auto material_world = make_shared<lambertian>(colour{0.15294 * random_double(), 0.68235 * random_double(), 0.37647 * random_double()});
    auto material_center_sphere = make_shared<dielectric>( 1.5);
    auto material_left_sphere = make_shared<metal>(colour{0.90588 * random_double(), 0.29804 * random_double(), 0.23529 * random_double()}, 0.5);
    auto material_right_sphere = make_shared<metal>(colour{0.60784 * random_double(), 0.34902 * random_double(), 0.71373 * random_double()}, 0.2);

    // setup hittable world
    hittable_list world{}; // when we pass it to ray_col it is cast to its public base - hittable
    world.add(make_shared<sphere>(point3{ 0, -100.5, -1},100, material_world));
    world.add(make_shared<sphere>(point3{ 0, 1, -1}, 1.5, material_center_sphere));
    world.add(make_shared<sphere>(point3{ 0, 1, -1}, -1.4, material_center_sphere));
    world.add(make_shared<sphere>(point3{ -2, 1, -1}, 0.5, material_left_sphere));
    world.add(make_shared<sphere>(point3{ 2, 1, -1}, 0.5, material_right_sphere));

    for(int i = -5; i < 5; i++){
        for(int j = -5; j < 5; j++){
            auto material_random_sphere = make_shared<metal>(colour{0.60784 * random_double(), 0.34902 * random_double(), 0.71373 * random_double()}, 0.2*random_double());
            world.add(make_shared<sphere>(
                    point3{ 1+static_cast<double>(i)* random_double()*0.9+0.1, random_double()*0.9+0.1, -1+static_cast<double>(j)* random_double()*0.9+0.1},
                    0.1 * random_double()*0.9+0.1,
                    material_random_sphere)
            );
        }
    }

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

                pix_col += ray_col(r, world, max_depth);
            }

            write_colour(std::cout, pix_col, samples_per_pixel);
        }
    }

    std::cerr << "\nDone.\n";
}