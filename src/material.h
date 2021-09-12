#ifndef MATERIAL_H
#define MATERIAL_H

#include "helper.h"
#include "hittable.h"

class material {
public:
    virtual bool scatter(const ray &r_incident, const hit_record &rec, colour &attenuation, ray &scattered) const = 0;
    virtual ~material() = default;
};

class lambertian : public material {
public:
    explicit lambertian(const colour &col) : albedo(col) {}

    bool scatter(const ray &r_incident, const hit_record &rec, colour &attenuation, ray &scattered) const override {
        auto scatter_dir = rec.normal + random_unit_vector(); // lambertian distribution scattering

        if(scatter_dir.near_zero()) // if near zero then scatter_dir is approaching direction of normal
            scatter_dir = rec.normal; // if this were to be zero, then normalising for example would produce errors

        scattered = { rec.p, scatter_dir };
        attenuation = albedo;
        // attenuation is reduction in intensity of light due to absorption when travelling through a medium

        return true;
    }
public:
    colour albedo{}; // albedo is the fraction of light that is reflected by a body, so this is the coloured fraction
};

class metal : public material {
public:
    metal(const colour &col, double fuzz) : albedo(col), fuzz(std::min(std::max(0.0, fuzz), 1.0)) {} // 0 <= fuzz <= 1

    bool scatter(const ray &r_incident, const hit_record &rec, colour &attenuation, ray &scattered) const override {
        vec3 reflected = reflect(unit_vector(r_incident.direction()), rec.normal);

        // where rec.p is the point of intersection of the ray on the object, and reflected is the direction of the
        // new ray
        scattered = ray(rec.p, reflected + fuzz*random_in_unit_sphere()); // adds random direction for fuzz
        attenuation = albedo;

        return dot(scattered.direction(), rec.normal) > 0; // is scattered ray dir in same dir as normal
    }
public:
    colour albedo{};
    double fuzz{};
};

#endif // MATERIAL_H