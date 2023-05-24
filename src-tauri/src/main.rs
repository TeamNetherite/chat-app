// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod invokables;

use netherite_chat_app::AppBuilder;

fn main() {
    AppBuilder::new().run();
}
