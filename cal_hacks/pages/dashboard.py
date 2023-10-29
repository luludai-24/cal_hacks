"""The dashboard page."""
from cal_hacks.templates import template

import reflex as rx
from cal_hacks.state import State

@template(route="/dashboard", title="Calculator", image="/chemex.png")
def dashboard() -> rx.Component:
    """The dashboard page.

    Returns:
        The UI for the dashboard page.
    """
    return rx.vstack(
        rx.hstack(
            rx.image(src="/chemex.png", width="32px", height="32px"),
            rx.heading("Caffeine Calculator")
        ),

        rx.text("Check your caffeine levels -- just enter the caffeine level of the drink and the time that you plan to have it!"),
        rx.recharts.bar_chart(
            rx.recharts.bar(
                data_key="caffeine", stroke="#57A4FF", fill="#57A4FF"
            ),
            rx.recharts.x_axis(data_key="time"),
            rx.recharts.y_axis(),
            data=State.caffeine_levels,
        ),

        rx.text("Caffeine Level"),
        rx.number_input(
            on_change=State.set_caffeine,
            min_ = 0,
            
        ),
        rx.text("Time of Day (24 hour)"),
        rx.number_input(
            on_change = State.set_time,
            min_ = 0,
            max_ = 23,
            
        ),
    )
