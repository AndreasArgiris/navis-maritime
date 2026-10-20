import { useSelector } from 'react-redux';
import { FiBox, FiCoffee, FiTool } from 'react-icons/fi';
import { useCurrentVessel } from '../vessel/useCurrentVessel';
import { useTabParam } from '../../shared/hooks/useTabParam';
import { selectCargo } from './cargoSlice';
import { INVENTORY_GROUPS, selectInventoryGroup } from './inventorySlice';
import TabNav, { TabPanel } from '../../shared/ui/TabNav';
import CargoPanel from './CargoPanel';
import StoresPanel from './StoresPanel';

const TABS = ['cargo', 'living', 'ship'];

export default function InventoryPage() {
  const vessel = useCurrentVessel();
  const cargoCount = useSelector((state) => selectCargo(state, vessel.id)).length;
  const livingCount = useSelector((state) => selectInventoryGroup(state, vessel.id, INVENTORY_GROUPS.living)).length;
  const shipCount = useSelector((state) => selectInventoryGroup(state, vessel.id, INVENTORY_GROUPS.ship)).length;
  const [tab, setTab] = useTabParam(TABS);

  return (
    <>
      <TabNav
        label="Inventory sections"
        idPrefix="inventory"
        layoutId="inventory-tab-underline"
        value={tab}
        onChange={setTab}
        tabs={[
          { value: 'cargo', label: 'Cargo', icon: FiBox, count: cargoCount },
          { value: 'living', label: 'Living supplies', icon: FiCoffee, count: livingCount },
          { value: 'ship', label: 'Ship stores', icon: FiTool, count: shipCount },
        ]}
      />
      <TabPanel value={tab} idPrefix="inventory">
        {tab === 'cargo' && <CargoPanel vessel={vessel} />}
        {tab === 'living' && (
          <StoresPanel
            key="living"
            vessel={vessel}
            group={INVENTORY_GROUPS.living}
            title="Living supplies"
            subtitle="Provisions, fresh water, galley, cabin and medical stores"
            itemLabel="Supply lines"
          />
        )}
        {tab === 'ship' && (
          <StoresPanel
            key="ship"
            vessel={vessel}
            group={INVENTORY_GROUPS.ship}
            title="Ship stores"
            subtitle="Lubricants, chemicals, safety equipment, deck and workshop stores"
            itemLabel="Store lines"
          />
        )}
      </TabPanel>
    </>
  );
}
