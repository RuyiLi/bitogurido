# bitogurido
a rhythm based game in beta.

## Bitomap Creation
[Example bitomap](https://raw.githubusercontent.com/RuyiLi/bitogurido/gh-pages/styxhelix.txt)

Bitomaps are just text files.

The first line of the file should be a **direct link** (e.g https://instaud.io/_/1jS9.mp3) to an audio file, or `none` if you don\'t want an audio file.

It is advised that you use [Instaudio](https://instaud.io/) to host the audio files.

An Instaudio link is usually in the format `https://instaud.io/id`, so to get the direct link just change it to `https://instaud.io/_/id.mp3`. Replace `id` with the characters following after the url.

---

The rest of the lines shouold contain the actual patterns. 

Each line should be formatted like so: `[bullet directions seperated by a space], [delay in ms], [speed]`

Each argument should be seperated by a comma; the default delay is 1000ms, and the default speed is 1.

Example: `tl br t b,, 1.4`

This will send bullets with a speed of 1.4 from the top left, bottom right, center top, and center bottom at the same time; because the delay field is blank, the next attack pattern on the next line will immediately commence.

[For an example bitomap, click here.](https://raw.githubusercontent.com/RuyiLi/bitogurido/gh-pages/styxhelix.txt)

### Pattern Codes

Diagonal:
```
tl = top left
tr = top right
bl = bottom left
br = bottom right
```

Vertical:
```
1t = leftmost top
2t or t = center top
3t = rightmost top
1b = leftmost bottom
2b or b = center bottom
3b = rightmost bottom
```

Horizontal:
```
1r = topmost right
2r or r = center right
3r = bottommost right
1l = topmost left
2l or l = center left
3l = bottommost left
```
