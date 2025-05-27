import { createRoute } from 'honox/factory';
import staffData from '../../data/staff.json';
import StaffList from '../islands/StaffList';
import CommonHeader from '../islands/CommonHeader';         // ★ 共通ヘッダー
import { generalMessages } from '../locales/translations'; // ★ 翻訳データ
import type { StaffData } from '../types/staff';

const typedStaffData = staffData as StaffData;

export default createRoute(async (c) => {
  return c.render(
    <>
      <div class="mx-auto py-16 px-4 sm:px-6 lg:px-8 max-w-3xl">
        <CommonHeader
          titleContent={generalMessages.staffTitle}
          descriptionContent={generalMessages.staffDescription}
        />
        <section class="mt-8 space-y-6">
          <StaffList staffMembers={typedStaffData.staff} />
        </section>
      </div>
    </>
  );
});
