const zombieMove = (zombie, movement, gridSize) => {
  switch (movement) {
    case "U":
      if (zombie.y === 0) {
        zombie.y = gridSize - 1;
      } else {
        zombie.y -= 1;
      }
      break;
    case "D":
      if (zombie.y === gridSize - 1) {
        zombie.y = 0;
      } else {
        zombie.y += 1;
      }
      break;
    case "L":
      if (zombie.x === 0) {
        zombie.x = gridSize - 1;
      } else {
        zombie.x -= 1;
      }
      break;
    case "R":
      if (zombie.x === gridSize - 1) {
        zombie.x = 0;
      } else {
        zombie.x += 1;
      }
      break;
  }
};

exports.getResult = async (req, res) => {
  const { gridSize, zombie, creatures, commands } = req.body;
  const zombies = [zombie];
  let zombiesNum = 0;

  while (zombiesNum < zombies.length) {
    for (let i = 0; i < commands.length; i++) {
      const currentZombie = zombies[zombiesNum];
      zombieMove(currentZombie, commands[i], gridSize);
      console.log(
        `zombie ${zombiesNum} moved to (${currentZombie.x},${currentZombie.y})`
      );
      if (creatures && creatures.length !== 0) {
        creatures.map((creature, index) => {
          if (creature.x === zombie.x && creature.y === zombie.y) {
            zombies.push(creature);
            creatures.splice(index, 1);
            console.log(
              `zombie ${zombiesNum} infected creature at (${currentZombie.x},${currentZombie.y})`
            );
          }
        });
      }
    }
    zombiesNum++;
  }

  res.status(200).json({
    zombies,
    creatures,
  });
};
