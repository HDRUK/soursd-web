import { Notification } from "@/types/notifications";
import { faker } from "@faker-js/faker";

const mockedNotification = (
  unread: boolean = true,
  notification?: Partial<Notification>
): Notification => ({
  id: faker.string.uuid(),
  type: "App\\Notifications\\AdminUserChanged",
  notifiable_type: "App\\Models\\User",
  notifiable_id: 1,
  data: {
    message: `${faker.lorem.words(3)} details changed!`,
    details: {
      organisation: {
        old: faker.company.name(),
        new: faker.company.name(),
      },
    },
    time: faker.date.recent().toISOString(),
  },
  read_at: unread ? null : faker.date.recent().toISOString(),
  created_at: faker.date.recent().toISOString(),
  updated_at: faker.date.recent().toISOString(),
  ...notification,
});

export { mockedNotification };
