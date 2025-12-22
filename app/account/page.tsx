export default function AccountPage() {
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">My Account</h1>

      <div className="space-y-3">
        <div className="p-3 border rounded">Profile</div>
        <div className="p-3 border rounded">My Orders</div>
        <div className="p-3 border rounded">Address</div>
        <div className="p-3 border rounded">Logout</div>
      </div>
    </div>
  );
}