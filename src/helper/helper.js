export function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
  
    const date = new Date(dateString);
    return date.toLocaleDateString("id", options);
  }

  export function getTimeDiff(dateString) {
    const now = new Date();
    const targetDate = new Date(dateString);
  
    const diffMs = now - targetDate; // Difference in milliseconds
    const diffMinutes = Math.floor(diffMs / 1000 / 60); // Difference in minutes
    const diffHours = Math.floor(diffMinutes / 60); // Difference in hours
    const diffDays = Math.floor(diffHours / 24); // Difference in days
    const diffMonths = Math.floor(diffDays / 30); // Approximate difference in months
  
    if (diffMinutes < 1) {
      return 'Just now';
  } else if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
  } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
  } else if (diffDays < 30) {
      return `${diffDays} days ago`;
  } else {
      return `${diffMonths} months ago`;
  }
  
  }
  