export const achievements = [
  { id: 'first-course', title: 'First Steps', description: 'Enroll in your first course', icon: '🌱', criteria: t => t.enrolled >= 1 },
  { id: 'five-courses', title: 'Course Collector', description: 'Enroll in 5 courses', icon: '📚', criteria: t => t.enrolled >= 5 },
  { id: 'first-lesson', title: 'First Lesson', description: 'Complete your first lesson', icon: '✅', criteria: t => t.lessonsCompleted >= 1 },
  { id: 'ten-lessons', title: 'Dedicated Learner', description: 'Complete 10 lessons', icon: '🔥', criteria: t => t.lessonsCompleted >= 10 },
  { id: 'course-complete', title: 'Course Graduate', description: 'Complete your first course', icon: '🎓', criteria: t => t.coursesCompleted >= 1 },
  { id: 'three-certs', title: 'Triple Threat', description: 'Earn 3 certificates', icon: '🏆', criteria: t => t.certificates >= 3 },
  { id: 'first-bookmark', title: 'Saved for Later', description: 'Bookmark your first lesson', icon: '🔖', criteria: t => t.bookmarks >= 1 },
  { id: 'five-bookmarks', title: 'Organizer', description: 'Bookmark 5 lessons', icon: '📑', criteria: t => t.bookmarks >= 5 },
  { id: 'profile-set', title: 'Who Are You?', description: 'Fill in your profile bio', icon: '👤', criteria: t => t.hasBio },
  { id: 'speed-learner', title: 'Speed Learner', description: 'Complete 3 lessons in one day', icon: '⚡', criteria: t => t.lessonsInDay >= 3 },
];
