#include "ecs.h"

#include <iostream>
#include <chrono>

struct position{
  position(double x = 0, double y = 0, double z = 0){
    this->x = x; this->y = y; this->z = z;
  }
  double x = 0, y = 0, z = 0;
};

struct properties{
  properties(double mass = 0, double volume = 0){ this->mass = mass; this->volume = volume; }
  double mass = 10.0;
  double volume = 30.0;
};

class physics : public System{
  const double gravity = 9.81998;
public:
  void run(ECS* ecs) {
    for(auto &entity : entitySet){
      auto posData = ecs->componentGetData<position>(entity);
      auto propData = ecs->componentGetData<properties>(entity);
      posData->y -= 10 * propData->volume;
    }
  }
};

double randomNumber(){
  srand(time(NULL));
  return (double)rand()/(double)RAND_MAX*100 - 50;
}

int main(){
  std::chrono::high_resolution_clock::time_point t1 = std::chrono::high_resolution_clock::now();

  ECS ecs;
  ecs.componentRegister<position>();

  ecs.systemRegister<physics>();
  ecs.systemAddComponentToSignature<physics, position>();

  ecs.componentRegister<properties>();
  ecs.systemAddComponentToSignature<physics, properties>();

  for(int i = 0; i < MAX_ENTITIES; i++){
    auto entity = ecs.entityCreate();
    ecs.componentAddEntity<position>(entity, position(randomNumber(), randomNumber(), randomNumber()));
    ecs.componentAddEntity<properties>(entity, properties(10, 20));
  }

  std::chrono::high_resolution_clock::time_point t2 = std::chrono::high_resolution_clock::now();
  std::chrono::duration<double> timeSpan = std::chrono::duration_cast<std::chrono::duration<double>>(t2 - t1);

  std::cout << timeSpan.count() << "\n";

  for(int i = 0; i < MAX_ENTITIES; i++){
    ecs.entityRemove(i);
  }

  std::chrono::high_resolution_clock::time_point t3 = std::chrono::high_resolution_clock::now();
  std::chrono::duration<double> timeSpan2 = std::chrono::duration_cast<std::chrono::duration<double>>(t3 - t2);

  std::cout << timeSpan2.count() << "\n";
}
