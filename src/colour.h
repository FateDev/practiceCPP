#ifndef COLOUR_H
#define COLOUR_H

#include "vector.h"

void write_colour(std::ostream &out, colour pix_col){
    out << static_cast<int>(255.999 * pix_col.x()) << ' '
        << static_cast<int>(255.999 * pix_col.y()) << ' '
        << static_cast<int>(255.999 * pix_col.z()) << '\n';
}

#endif //COLOUR_H
