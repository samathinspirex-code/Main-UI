param([string]$SourceDirectory = 'C:\Users\Samath\Downloads', [string]$Ffmpeg)
$ErrorActionPreference = 'Stop'
if (-not $Ffmpeg) { throw 'Provide the path to ffmpeg with -Ffmpeg.' }
$destination = Join-Path $PSScriptRoot '../public/testimonials'
New-Item -ItemType Directory -Force $destination | Out-Null
$videos = @(
    @{ Slug='gimhani-edirisinghe'; File='Gimhani Edirisinghe (HND) Testimonial.mp4'; Time='4'; Crop='crop=980:530:50:700' },
    @{ Slug='akram-razik'; File='Akram Razik (Foundation + HND) Testimonial.mp4'; Time='3'; Crop='crop=980:530:50:700' },
    @{ Slug='nidarshana-premkumar'; File='Nidarshana Premkumar (HND) Testimonial.mp4'; Time='3'; Crop='crop=980:530:50:700' },
    @{ Slug='yara-benjamin'; File='Yara Benjamin (Foundation) Testimoanial.mp4'; Time='5'; Crop='crop=660:730:205:650' }
)
foreach ($item in $videos) {
    $source = Join-Path $SourceDirectory $item.File
    & $Ffmpeg -nostdin -loglevel error -ss $item.Time -i $source -vf $item.Crop -frames:v 1 -q:v 2 -update 1 -y (Join-Path $destination ($item.Slug + '.jpg'))
    if ($LASTEXITCODE -ne 0) { throw "Thumbnail extraction failed: $($item.File)" }
    & $Ffmpeg -nostdin -loglevel error -i $source -map 0:v:0 -map '0:a:0?' -vf 'scale=720:-2' -r 30 -c:v libx264 -preset fast -crf 23 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart -y (Join-Path $destination ($item.Slug + '.mp4'))
    if ($LASTEXITCODE -ne 0) { throw "Video conversion failed: $($item.File)" }
    Write-Output "Prepared $($item.Slug)"
}
