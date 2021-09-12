#ifndef HITTABLE_LIST_H
#define HITTABLE_LIST_H

#include <vector>
#include <memory>

#include "hittable.h"

using std::shared_ptr;
using std::make_shared;

class hittable_list : public hittable {
public:
    hittable_list() = default;
    hittable_list(shared_ptr<hittable> obj) { add(obj); }

    void clear() { objects.clear(); }
    void add(shared_ptr<hittable> obj) { objects.push_back(obj); }

    bool hit(const ray &r, double t_min, double t_max, hit_record &rec) const override;
public:
    std::vector<shared_ptr<hittable>> objects{};
};

bool hittable_list::hit(const ray &r, double t_min, double t_max, hit_record &rec) const {
    bool hit_anything = false;
    double closest_so_far = t_max; // we modify the t_max, this allows us to get only the closest intersection

    for(const auto &object : objects){
        if(object->hit(r, t_min, closest_so_far, rec)){
            hit_anything = true;
            closest_so_far = rec.t;
        }
    }

    return hit_anything;
}


#endif // HITTABLE_LIST_H