import { useRef } from "react";
import Fetcher from "@/request/fetcher";
import { Button, Form, Row, Space, Table } from "antd";
import PageScaffold from "@/components/pageScaffold";
import FormFields from "@/components/FormFields";
import useTableDataController from "@/hooks/useTableDataController";
import { searchConfigs, tableColumns } from "./constant";

export default function Combo() {
  const [form] = Form.useForm();
  const initialSearchValues = {};

  const tableColumnsWithAction = tableColumns.concat({
    title: "操作",
    align: "center",
    render: (_, record) => {
      return (
        <Space>
          <Button type="primary" size="small">
            function
          </Button>
        </Space>
      );
    },
  });
  const getTableList = async () => {
    return {
      data: [],
      rowTop: 20,
    };
  };
  const tableController = useTableDataController(getTableList);

  return (
    <PageScaffold>
      <PageScaffold.SearchArea>
        <Form
          form={form}
          name="basic"
          initialValues={initialSearchValues}
          onFinish={() => tableController.search()}
        >
          <Row gutter={10}>
            <FormFields configs={searchConfigs} withSearchButton />
          </Row>
        </Form>
      </PageScaffold.SearchArea>
      <PageScaffold.TableArea>
        <Table
          bordered
          {...tableController.tableProps}
          columns={tableColumnsWithAction}
        />
      </PageScaffold.TableArea>
    </PageScaffold>
  );
}
