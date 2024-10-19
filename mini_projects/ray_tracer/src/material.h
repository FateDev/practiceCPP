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

class dielectric : public material {
public:
    dielectric(double index_of_refraction) : ir(index_of_refraction) {}

    bool scatter(const ray &r_incident, const hit_record &rec, colour &attenuation, ray &scattered) const override {
        attenuation = colour(1.0, 1.0, 1.0);
        double refraction_ratio = rec.front_face ? (1.0/ir) : ir; // depending on if coming into/out of material

        vec3 unit_dir = unit_vector(r_incident.direction()); // the refract function requires normalised vectors

        double cos_theta_i = dot(-unit_dir, rec.normal); // gets angle between ray and normal
        // if n1/n2 * sin(theta_i) > 1 then total internal reflection
        // or n1/n2 * sqrt(1-cos(theta_i)^2) > 1
        // or sqrt((n1/n2)^2 * (1-cos(theta_i)^2)) > 1
        // or (n1/n2)^2 * (1-cos(theta_i)^2) > 1 (which is what I've done below - avoids the square root)
        bool cannot_refract = refraction_ratio*refraction_ratio*(1-cos_theta_i*cos_theta_i) > 1;

        vec3 direction_out;
        if(cannot_refract || reflectance(cos_theta_i, refraction_ratio) > random_double())
            direction_out = reflect(unit_dir, rec.normal);
        else
            direction_out = refract(unit_dir, rec.normal, refraction_ratio);

        scattered = ray(rec.p, direction_out); // scattered ray from the point of intersection, in the refracted direction
        return true;
    }
public:
    double ir{};
private:
    static double reflectance(double cosine, double ref_idx) {
        // this returns the reflection coefficient, which describes how much of a wave is reflected,
        // so we can use it as 'probability of reflection' when rendering,
        // and it becomes the ratio of the overall light reflected
        // this is Schlick's approximation for reflectance
        auto r0 = (1-ref_idx) / (1+ref_idx);
        r0 *= r0;
        return r0 + (1-r0)*pow((1-cosine), 5);
    }
};

#endif // MATERIAL_H