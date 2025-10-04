async function loadListings() {
  try {
    const res = await fetch("/api/listings");
    const listings = await res.json();
    // Render listings (same as your current logic)
  } catch (err) {
    // Handle error
  }
}
