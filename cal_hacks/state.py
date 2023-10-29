"""Base state for the app."""

import reflex as rx
import datetime as dt
import numpy as np
import pandas as pd


class State(rx.State):
    """Base state for the app.

    The base state is used to store general vars used throughout the app.
    """

    show: bool = False

    form_data: list

    caffeine: float = 100

    time: int = 0

    text: str = "Type something..."

    def change(self):
        self.show = not (self.show)

    def handle_submit(self, form_data: dict):
        """Handle the form submit."""
        self.form_data.append(form_data)
        print(self.form_data)
        return [
            rx.set_value(field_id, "")
            for field_id in form_data
        ]

    def index():
        return rx.data_table(
            data=State.data,
            columns=State.columns,
        )
    
    @rx.var
    def update_drinks(self) -> list:
        drinks = []
        for drink in self.form_data:
            drinks.append(
                rx.flex (
                    rx.image(src="/cup.png", width="32px", height="32px"),
                    rx.text(drink["drink_name"]),
                    rx.spacer(),
                    rx.text(drink["caffeine_level"]),
                    width = "100%"
                )
            )

        return drinks
    
    @rx.var
    def caffeine_levels(self) -> list:
        times = [dt.time(i).strftime("%H:%M") for i in range(24)]

        hours = np.arange(0, 24)

        levels = self.caffeine * 0.5 ** (hours / 5)

        levels_shifted = np.roll(levels, self.time)
        levels_shifted[:self.time] = 0

        data = [{"time": time, "caffeine": caffeine} for time, caffeine in zip(times, levels_shifted)]

        return data




