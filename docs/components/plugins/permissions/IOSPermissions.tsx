import { useMemo } from 'react';

import { IOSPermission, iosPermissions, PermissionReference } from './data';

import { createPermalinkedComponent } from '~/common/create-permalinked-component';
import { Cell, HeaderCell, Row, Table, TableHead } from '~/ui/components/Table';
import { P, CODE } from '~/ui/components/Text';

type IOSPermissionsProps = {
  permissions: PermissionReference<IOSPermission>[];
};

const PermissionPermalink = createPermalinkedComponent(P, {
  baseNestingLevel: 4,
});

export function IOSPermissions(props: IOSPermissionsProps) {
  const list = useMemo(() => getPermissions(props.permissions), [props.permissions]);

  return (
    <Table>
      <TableHead>
        <Row>
          <HeaderCell>Info.plist Key</HeaderCell>
          <HeaderCell>Description</HeaderCell>
        </Row>
      </TableHead>
      <tbody>
        {list.map(permission => (
          <Row key={permission.name}>
            <Cell>
              <PermissionPermalink id={`permission-${permission.name.toLowerCase()}`}>
                <CODE>{permission.name}</CODE>
              </PermissionPermalink>
            </Cell>
            <Cell>{permission.description}</Cell>
          </Row>
        ))}
      </tbody>
    </Table>
  );
}

function getPermissions(permissions: IOSPermissionsProps['permissions']) {
  return permissions
    .map(permission =>
      typeof permission === 'string'
        ? iosPermissions[permission]
        : { ...iosPermissions[permission.name], ...permission }
    )
    .filter(Boolean);
}
