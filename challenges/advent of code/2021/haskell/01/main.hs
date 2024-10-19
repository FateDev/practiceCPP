main = do  
  contents <- readFile "input.txt"
  let numStrs = words contents
  let nums = map readInt numStrs
  putStrLn $ "Part 1: " ++ (show $ foldl1 (+) $ change nums)
  putStrLn $ "Part 2: " ++ (show $ foldl1 (+) $ change $ window nums)

readInt :: String -> Int
readInt = read

change :: [Int] -> [Int]
change depths
  = changeHelper depths (-1)
  where
    changeHelper :: [Int] -> Int -> [Int]
    changeHelper (dcurr:ds) (-1) = changeHelper ds dcurr
    changeHelper (dcurr:ds) dprev
      = (fromEnum $ dprev < dcurr) : changeHelper ds dcurr
    changeHelper [] _ = []

window :: [Int] -> [Int]
window depths
  = windowHelper (-1) (-1) (-1) depths
  where
    windowHelper :: Int -> Int -> Int -> [Int] -> [Int]
    windowHelper (-1) (-1) (-1) (d:ds) = windowHelper d (-1) (-1) ds
    windowHelper a (-1) (-1) (d:ds) = windowHelper a d (-1) ds
    windowHelper a b (-1) (d:ds) = windowHelper a b d ds
    windowHelper a b c (d:ds) = (a+b+c) : windowHelper b c d ds
    windowHelper a b c [] = [a+b+c]
