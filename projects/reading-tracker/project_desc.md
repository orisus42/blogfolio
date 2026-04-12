---
title: Reading tracker
date: 2026-02-01
description: A command-line tool for tracking books I've read, with notes and ratings stored in a local CSV.
---

I read a fair amount and kept losing track of what I'd already read and what I thought of it. The obvious solution was a spreadsheet. The solution I actually built was a small CLI tool that writes to a spreadsheet.

It's not better than just using a spreadsheet directly. But building it took an afternoon and it was a good excuse to learn more about Python's `argparse` module.

## What it does

- `read add "Book Title" --author "Name" --rating 4` adds an entry
- `read list` shows everything in a table sorted by date added
- `read list --rating 5` filters by rating
- `read notes "Book Title"` opens a text file for that book in the default editor

All data lives in a CSV in the home directory. Notes are plain text files in a subfolder next to it.

## What I learned

Mostly that argument parsing in Python is more ergonomic than I expected. Also that the most useful tools aren't clever, they just do the one thing you need them to do and stay out of the way.

## Stack

- Python, standard library only except for `tabulate` for the table output
- Data stored as CSV (no database, not needed)

Not published anywhere. Lives on my machine.
