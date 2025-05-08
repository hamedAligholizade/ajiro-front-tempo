export const fetchUsers = async () => {
  const response = await fetch("/api/users", {
    headers: {
      Authorization: "Basic YWRtaW46YWppcm8yMDI0", // Base64 encoded "admin:ajiro2024"
    },
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  
  return response.json();
}; 