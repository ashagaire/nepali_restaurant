export function adminRequestTemplate(
  requestedEmail: string,
  approveUrl: string,
  rejectionUrl: string
) {
  return {
    subject: "New Admin Request",
    html: `
      <h2>New Admin Request</h2>
      <p>Email requesting admin access: <b>${requestedEmail}</b></p>
      <a href="${approveUrl}" style="padding:10px 16px;background:#16a34a;color:white;border-radius:6px;text-decoration:none;">
        Approve Admin
      </a>
      <br/><br/>
      <a href="${rejectionUrl}" style="padding:10px 16px;background:#dc2626;color:red;border-radius:6px;text-decoration:none;">
        Reject Admin
      </a>
      <br/><br/>
      <p>Ignore if unexpected.</p>
    `,
  };
}

export function adminApprovedTemplate(email: string) {
  return {
    subject: "Admin Access Approved",
    html: `
      <h2>Admin Access Approved ✅</h2>
      <p>Your admin access has been approved. You can now log in with your email: <b>${email}</b></p>
    `,
  };
}

export function adminRejectedTemplate(email: string) {
  return {
    subject: "Admin Access Request Rejected",
    html: `
      <h2>Admin Request Rejected ❌</h2>
      <p>Hello,</p>
      <p>Your request for admin access using the email <b>${email}</b> has been reviewed.</p>
      <p>Unfortunately, the request was <b>rejected</b> by a super admin.</p>
      <p>If you believe this is a mistake, please contact the system administrator.</p>
      <br />
      <p>Regards,<br/>Restaurant Admin Team</p>
    `,
  };
}
