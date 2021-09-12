#ifndef COLOUR_H
#define COLOUR_H

#include "vector.h"

void write_colour(std::ostream &out, colour pix_col, int samples_per_pixel){
    auto r = pix_col.x();
    auto g = pix_col.y();
    auto b = pix_col.z();

    // divide colours by the number or samples
    auto scale = 1.0 / samples_per_pixel;
    r *= scale;
    g *= scale;
    b *= scale;

    // write colors
    out << static_cast<int>(256 * clamp(r, 0.0, 0.999)) << ' '
        << static_cast<int>(256 * clamp(g, 0.0, 0.999)) << ' '
        << static_cast<int>(256 * clamp(b, 0.0, 0.999)) << '\n';
}

#endif //COLOUR_H
