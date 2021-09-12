#ifndef COLOUR_H
#define COLOUR_H

#include "vector.h"

void write_colour(std::ostream &out, colour pix_col, int samples_per_pixel){
    // divide colours by the number or samples, and sqrt it for gamma correction ( col^(1/gamma) - gamma 2)
    auto scale = 1.0 / samples_per_pixel;
    auto r = sqrt(pix_col.x() * scale);
    auto g = sqrt(pix_col.y() * scale);
    auto b = sqrt(pix_col.z() * scale);

    // write colors
    out << static_cast<int>(256 * clamp(r, 0.0, 0.999)) << ' '
        << static_cast<int>(256 * clamp(g, 0.0, 0.999)) << ' '
        << static_cast<int>(256 * clamp(b, 0.0, 0.999)) << '\n';
}

#endif //COLOUR_H
