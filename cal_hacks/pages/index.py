"""The home page of the app."""

from cal_hacks import styles
from cal_hacks.templates import template
from cal_hacks.state import State

import reflex as rx


@template(route="/", title="Home", image="/bean.png")
def index() -> rx.Component:
    """The home page.

    Returns:
        The UI for the home page.
    """
    def get_item(item):
        return rx.list_item(
            rx.hstack(
                rx.button(
                    on_click=lambda: State.finish_item(
                        item
                    ),
                    height="1.5em",
                    background_color="white",
                    border="1px solid blue",
                ),
                rx.text(item["drink"], font_size="1.25em"),
            ),
        )
    

    return rx.vstack (
        rx.vstack(
            rx.hstack(
                rx.image(src="/bean.png", width="32px", height="32px"),
                rx.heading("Home"),
            ),
            rx.text("-------------------------------------------------------------------------------------------------"),
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
                    rx.stat_number("300 mg"),
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

        rx.box(
            "Caffeine Budget Remaining (based on 400 mg daily limit): 100 mg",
            bg="#004FAC",
            color="white",
            border_radius="xl",
            width="100%",
            text_align="center"
        ),

        rx.vstack(
            rx.text("-------------------------------------------------------------------------------------------------"),
            rx.text("Caffeine Levels", font_size="lg", text_align="left"),
            width = "100%",
            align_items = "left"
        ),
        
        rx.recharts.bar_chart(
            rx.recharts.bar(
                data_key="caffeine", stroke="#57A4FF", fill="#57A4FF"
            ),
            rx.recharts.x_axis(data_key="time"),
            rx.recharts.y_axis(),
            data=State.caffeine_levels,
        ),

        rx.number_input(
            on_change=State.set_caffeine,
            min_ = 0
        ),

        rx.number_input(
            on_change = State.set_time,
            min_ = 0,
            max_ = 23
        ),

        rx.vstack(
            rx.text("-------------------------------------------------------------------------------------------------"),
            rx.text("Drinks of the Day", font_size="lg", text_align="left"),
            width = "100%",
            align_items = "left"
        ),

        # rx.vstack(
        #     rx.heading("Todos"),

        #     rx.divider(),
        #     rx.ordered_list(
        #         rx.foreach(
        #             State.form_data,
        #             get_item,
        #         ),
        #     ),
        #     bg="#ededed",
        #     padding="1em",
        #     border_radius="0.5em",
        #     shadow="lg",
        # ),

        rx.vstack (
            rx.flex (
                rx.image(src="/frappe.png", width="32px", height="32px"),
                rx.text("Caffe Latte"),
                rx.spacer(),
                rx.text("154 mg"),
                width = "100%"
            ),
            rx.flex (
                rx.image(src="/cup.png", width="32px", height="32px"),
                rx.text("Espresso"),
                rx.spacer(),
                rx.text("154 mg"),
                width = "100%"
            ),
            # State.update_drinks()
        ),
 
        rx.button("Add Drink", on_click=State.change),
        rx.modal(
            rx.modal_overlay(
                rx.modal_content(
                    rx.modal_header("Add Drink"),
                    rx.vstack(
                        rx.form(
                            rx.vstack(
                                rx.input(
                                    placeholder="Drink Name",
                                    id="drink_name",
                                ),
                                rx.input(
                                    placeholder="Caffeine Level", id="caffeine_level"
                                ),
                                rx.input(
                                    placeholder="Time (24 hour format)", id="time"
                                ),
                                rx.button("Submit", type_="submit"),
                            ),
                            on_submit=State.handle_submit,
                        ),
                        # rx.divider(),
                        # rx.heading("Results"),
                        # rx.text(State.form_data.to_string()),
                    ),
                    rx.modal_footer(
                        rx.button(
                            "Close", on_click=State.change
                        ),
                    ),
                )
            ),
            is_open=State.show,
        ),
        
        # rx.text(State.form_data.to_string()),

        width = "100%",
        align_items="left"
    )


