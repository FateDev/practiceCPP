#ifndef UTILITY_PRINTING_HELPER
#define UTILITY_PRINTING_HELPER

#include <stdlib.h>
#include <stdio.h>
#include <sstream>
#include <iostream>

#include "foreach_macro.hpp"

namespace utility_printing_helper {

void log_helper_function(std::string msg, bool cerr_or_not);
void fatal_error(std::string error_message);
}; // namespace utility

#define STREAM_ITEM(X) " ### " << #X << ": " << X <<

// helper for printing longer messages for a fatal error
#define FATAL_ERROR(...) utility_printing_helper::fatal_error(static_cast<std::ostringstream&&>(std::ostringstream{} << __VA_ARGS__).str())
#define FATAL_ERROR_VARS(...) utility_printing_helper::fatal_error(static_cast<std::ostringstream&&>(std::ostringstream{} << FOREACH(STREAM_ITEM, (__VA_ARGS__)) "").str())

#ifdef VERBOSE_DEBUG
// helper for printing out variables with their names
#define PRINT_DEBUG_VARS(...) std::cout << FOREACH(STREAM_ITEM, (__VA_ARGS__)) std::endl

// helper for using cout
#define PRINT_DEBUG(...) std::cout << __VA_ARGS__ << std::endl

// helper for using cerr
#define PRINT_ERROR_DEBUG(...) std::cerr << __VA_ARGS__ << std::endl

// used for printing informational data
#define LOG_DEBUG(CERR_OR_NOT, ...) utility_printing_helper::log_helper_function(static_cast<std::ostringstream&&>(std::ostringstream{} << __VA_ARGS__).str(), CERR_OR_NOT)
#else
#define PRINT_DEBUG(...) ((void)0)
#define PRINT_ERROR_DEBUG(...) ((void)0)
#define PRINT_DEBUG_VARS(...) ((void)0)
#define LOG_DEBUG(...) ((void)0)
#endif


namespace utility_printing_helper {

inline void log_helper_function(std::string msg, bool cerr_or_not) {
  time_t t = time(NULL);
  struct tm *tm = localtime(&t);
  std::string time = asctime(tm);
  time.pop_back();
  PRINT_DEBUG("[ " << time << " ]: " << msg);
}

inline void fatal_error(std::string error_message) {
  perror(std::string("Fatal Error: " + error_message).c_str());
  exit(1);
}

}; // namespace utility

#endif