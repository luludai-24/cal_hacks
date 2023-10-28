"""Welcome to Reflex!."""

from cal_hacks import styles

# Import all the pages.
from cal_hacks.pages import *

import reflex as rx

# Create the app and compile it.
app = rx.App(style=styles.base_style)
app.compile()
