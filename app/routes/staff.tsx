import { createRoute } from 'honox/factory';
import staffData from '../../data/staff.json';
import StaffList from '../islands/StaffList';
import type { StaffData } from '../types/staff';

const typedStaffData = staffData as StaffData;

export default createRoute(async (c) => {
  return c.render(
    <>
      <section class="mt-8 space-y-6">
        <StaffList staffMembers={typedStaffData.staff} />
      </section>
    </>
  );
});
