$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$targets = @(
  @{ Path = 'assets\mower-sprite-cutting-v1.png'; Points = @(@(78, 135), @(85, 140), @(90, 145)) },
  @{ Path = 'assets\mower-sprite-mow-2-v1.png'; Points = @(@(75, 135), @(80, 140), @(85, 145), @(90, 150)) },
  @{ Path = 'assets\mower-sprite-mow-3-v1.png'; Points = @(@(75, 135), @(80, 140), @(85, 145), @(90, 150)) },
  @{ Path = 'assets\mower-sprite-mow-4-v1.png'; Points = @(@(75, 135), @(80, 140), @(85, 145), @(90, 150)) },
  @{ Path = 'assets\mower-sprite-thumb-start-v1.png'; Points = @(@(78, 135), @(85, 140), @(90, 145)) },
  @{ Path = 'assets\mower-sprite-thumb-1-v1.png'; Points = @(@(75, 135), @(80, 140), @(85, 145), @(90, 150)) },
  @{ Path = 'assets\mower-sprite-thumb-mid-v1.png'; Points = @(@(78, 135), @(85, 140), @(90, 145)) },
  @{ Path = 'assets\mower-sprite-thumb-2-v1.png'; Points = @(@(75, 135), @(80, 140), @(85, 145), @(90, 150)) },
  @{ Path = 'assets\mower-sprite-thumbs-v1.png'; Points = @(@(78, 135), @(85, 140), @(90, 145)) },
  @{ Path = 'assets\grass-uncut-sprite-v1.png'; Points = @(@(0, 0), @(511, 0)) },
  @{ Path = 'assets\grass-cut-sprite-v1.png'; Points = @(@(0, 0), @(511, 0)) }
)

foreach ($target in $targets) {
  $bitmap = [System.Drawing.Bitmap]::new((Resolve-Path $target.Path).Path)
  try {
    foreach ($point in $target.Points) {
      $pixel = $bitmap.GetPixel($point[0], $point[1])
      if ($pixel.A -ne 0) {
        throw "$($target.Path) retains an opaque background artifact at $($point[0]),$($point[1])"
      }
    }
  }
  finally {
    $bitmap.Dispose()
  }
}

foreach ($path in @('assets\grass-uncut-sprite-v1.png', 'assets\grass-cut-sprite-v1.png')) {
  $bitmap = [System.Drawing.Bitmap]::new((Resolve-Path $path).Path)
  try {
    if ($bitmap.Width -ne 512 -or $bitmap.Height -ne 72) {
      throw "$path must remain a 512 by 72 pixel tile"
    }

    for ($y = 0; $y -lt $bitmap.Height; $y++) {
      if ($bitmap.GetPixel(0, $y).ToArgb() -ne $bitmap.GetPixel(($bitmap.Width - 1), $y).ToArgb()) {
        throw "$path does not join cleanly at row $y"
      }
    }
  }
  finally {
    $bitmap.Dispose()
  }
}

Write-Output 'Sprite transparency checks passed.'
