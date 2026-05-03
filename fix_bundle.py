with open("pixel_app/dynamic_game_pixel_shooter/js/bundle.js", "r") as f:
    content = f.read()

content = content.replace("this.videocallback();//", "this.videocallback();")

with open("pixel_app/dynamic_game_pixel_shooter/js/bundle.js", "w") as f:
    f.write(content)
