"""The settings page."""

from cal_hacks.templates import template

import reflex as rx
import pandas as pd


@template(route="/settings", title="Drinks", image="/french_press.png")
def settings() -> rx.Component:
    """The settings page.

    Returns:
        The UI for the settings page.
    """

    caffeine_data = pd.read_csv("C:/Users/lulum/Downloads/cal_hacks/assets/caffeine.csv")

    return rx.vstack(
        rx.hstack(
            rx.image(src="/french_press.png", width="32px", height="32px"),
            rx.heading("Drink Database")
            ),

        rx.text("Check the caffeine level of drinks here!"),

        rx.data_table(data=caffeine_data[["Drink","Volume (ml)","Calories","Caffeine (mg)","Type"]], 
                      search=True, pagination=True)

    )
