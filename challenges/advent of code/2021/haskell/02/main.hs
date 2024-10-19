main = do  
  contents <- readFile "input.txt"
  let directions = ((map words) . lines) contents
  putStrLn $ "Part 1: " ++ (show $ productTuple $ readInstructions directions)
  putStrLn $ "Part 2: " ++ (show $ productFirst2Tuple $ readInstructionsWithAim directions)

type Position = (Int, Int) -- horizontal, depth

readInt :: String -> Int
readInt = read

productTuple :: (Int, Int) -> Int
productTuple (a, b) = a*b

move :: [String] -> Position -> Position
move ["forward", amount] (hor, depth) = (hor + readInt amount, depth)
move ["up", amount] (hor, depth) = (hor, depth - readInt amount)
move ["down", amount] (hor, depth) = (hor, depth + readInt amount)
move _ pos = pos

readInstructions :: [[String]] -> Position
readInstructions instructions
  = executeMoves instructions (0, 0)
  where
    executeMoves :: [[String]] -> Position -> Position
    executeMoves (curr:nexts) pos = executeMoves nexts (move curr pos)
    executeMoves [] pos = pos

type PositionWithAim = (Int, Int, Int) -- horizontal, depth, aim

productFirst2Tuple :: (Int, Int, Int) -> Int
productFirst2Tuple (a, b, _) = a*b

moveWithAim :: [String] -> PositionWithAim -> PositionWithAim
moveWithAim ["forward", amount] (hor, depth, aim)
  = (hor + scalar, depth + aim*scalar , aim)
  where
    scalar = readInt amount
moveWithAim ["up", amount] (hor, depth, aim) = (hor, depth, aim - readInt amount)
moveWithAim ["down", amount] (hor, depth, aim) = (hor, depth, aim + readInt amount)
moveWithAim _ pos = pos

readInstructionsWithAim :: [[String]] -> PositionWithAim
readInstructionsWithAim instructions
  = executeMoves instructions (0, 0, 0)
  where
    executeMoves :: [[String]] -> PositionWithAim -> PositionWithAim
    executeMoves (curr:nexts) pos = executeMoves nexts (moveWithAim curr pos)
    executeMoves [] pos = pos
