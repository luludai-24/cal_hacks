"""The home page of the app."""

from cal_hacks import styles
from cal_hacks.templates import template

import reflex as rx


@template(route="/", title="Home", image="/bean.png")
def index() -> rx.Component:
    """The home page.

    Returns:
        The UI for the home page.
    """

    data = [
        {"time": "9am", "level": 154},
        {"time": "10am", "level": 136.37},
        {"time": "11am", "level": 274.75},
        {"time": "12pm", "level": 243.29},
        {"time": "1pm", "level": 215.44},
        {"time": "2pm", "level": 190.77},
        {"time": "3pm", "level": 168.92},
        {"time": "4pm", "level": 149.58},
        {"time": "5pm", "level": 132.45},
        {"time": "6pm", "level": 117.29},
        {"time": "7pm", "level": 103.86},
        {"time": "8pm", "level": 91.97},
        {"time": "9pm", "level": 81.44},
        {"time": "10pm", "level": 72.11},
        {"time": "11pm", "level": 63.85},
    ]

    return rx.vstack (
        rx.vstack(
            rx.heading("Today", font_size="2xl", text_align="left"),
            rx.text("---------------------------------------------------------------------------------------"),
            rx.text("Caffeine Intake", font_size="lg", text_align="left"),
            width = "100%",
            align_items = "left"
        ),

        rx.flex (
            rx.image(
                src="/dripper.png", width="64px", height="64px"
            ),
            rx.spacer(),
            rx.vstack(
                rx.stat(
                    rx.stat_help_text("Current"),
                    rx.stat_number("190 mg"),
                ),
                rx.stat(
                    rx.stat_help_text("Day Total"),
                    rx.stat_number("190/308 mg"),
                ),
                align_items="left"
            ),
            rx.spacer(),
            rx.stat(
                rx.stat_help_text("Drinks"),
                rx.stat_number("2 cups"),
                ),
        width = "100%",
        align_items="left"
        ),     

        rx.box (
            "Caffeine Budget Remaining: 92 mg",
            bg="#004FAC",
            color="white",
            border_radius="xl",
            width="100%",
            text_align="center"
        ),

        rx.vstack(
            rx.text("---------------------------------------------------------------------------------------"),
            rx.text("Caffeine Levels", font_size="lg", text_align="left"),
            width = "100%",
            align_items = "left"
        ),
        
        rx.recharts.bar_chart(
            rx.recharts.bar(
                data_key="level", stroke="#57A4FF", fill="#57A4FF"
            ),
            rx.recharts.x_axis(data_key="time"),
            rx.recharts.y_axis(),
            data=data,
        ),

        rx.vstack(
            rx.text("---------------------------------------------------------------------------------------"),
            rx.text("Drinks of the Day", font_size="lg", text_align="left"),
            width = "100%",
            align_items = "left"
        ),

        rx.flex (
            rx.vstack (
                rx.hstack (
                    rx.image(src="/frappe.png", width="32px", height="32px"),
                    rx.text("Caffe Latte"),
                    rx.spacer(),
                    rx.text("154 mg"),
                ),
                width = "100%"
            )
        ),    

        width = "100%",
        align_items="left"
    )


