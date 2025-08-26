from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Home Page
@app.route("/")
def home():
    return render_template("index.html")

# Treatments Page
@app.route("/treatments")
def treatments():
    return render_template("treatments.html")

# Appointment Form Submission
@app.route("/appointment", methods=["POST"])
def appointment():
    name = request.form.get("name")
    email = request.form.get("email")
    contact = request.form.get("contact")
    date = request.form.get("date")
    time = request.form.get("time")
    message = request.form.get("message")

    # For now, just print (later we can store in DB or send email)
    print("📌 New Appointment Request")
    print(f"Name: {name}")
    print(f"Email: {email}")
    print(f"Contact: {contact}")
    print(f"Date: {date}")
    print(f"Time: {time}")
    print(f"Message: {message}")

    # Redirect back to home page (you can also show a success page)
    return redirect(url_for("home"))

import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # use Render's PORT or default to 5000
    app.run(host="0.0.0.0", port=port, debug=False)


