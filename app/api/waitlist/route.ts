export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return Response.json(
        { message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // In production this would write to a database or email service.
    // For now we acknowledge the signup.
    return Response.json({
      message: "You're on the list! We'll be in touch soon.",
    });
  } catch {
    return Response.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}