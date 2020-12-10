import React, { ChangeEvent, Component, FormEvent } from 'react';
import {
  AppBar,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Tabs,
  Tab,
  TextField
} from '@material-ui/core';
import {
  AddCircleOutline,
  RemoveCircleOutline
} from '@material-ui/icons';
import { SaveFormProps, SaveFormData, SheetProps } from '../models/form';
import '../styles/form.css';
import { genString, saveSheet } from '../helpers/files';
import bind from 'bind-decorator';

export default class SaveForm extends Component<SaveFormProps, SaveFormData> {
  constructor(props: SaveFormProps) {
    super(props);

    const { label, btn, fileName } = props;
    const sheets: SheetProps[] = [{ name: 'S1', data: '' }];
    this.state = {
      label: label ?? 'Sheets data',
      btn: btn ?? 'Save',
      fileName: fileName ?? 'spreadsheet',
      format: 'txt',
      saveAll: false,
      sheets,
      selectedSheetIdx: 0
    } as SaveFormData;

  }

  @bind
  addSheet() {
    const sheets = this.state.sheets as SheetProps[];
    const newIndex = sheets.length;
    this.setState({
      ...this.state,
      sheets: [...sheets, { name: `S${newIndex  + 1}`, data: '' }],
      selectedSheetIdx: newIndex
    });
  }
  @bind
  onChangeFormat(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    this.setState({ ...this.state, format: event.target?.value as string });
  }
  @bind
  onChangeSaveAll(event: ChangeEvent<HTMLInputElement>) {
    const saveAll: boolean = event.target.checked;
    this.setState({ ...this.state, saveAll });
  };
  @bind
  onTabChange(
    event: ChangeEvent<{}>,
    tabsValueSheetIndex: number
  ) {
    this.setState({ ...this.state, selectedSheetIdx: tabsValueSheetIndex });
  }
  @bind
  onChangeSheet(
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    sheetIndex: number,
    field: string = 'data'
  ) {
    this.setState({
      ...this.state,
      sheets: this.state.sheets.map((sheet, idx) => {
        if (sheetIndex === idx) {
          sheet[field as keyof SheetProps] = event.target?.value;
        }
        return sheet;
      })
    });
  }
  @bind
  onRemoveSheet(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    sheetIndex: number
  ) {
    this.setState({
      ...this.state,
      sheets: this.state.sheets.filter((sheet, idx) => idx !== sheetIndex),
      selectedSheetIdx: 0
    });
  }
  @bind
  saveData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { fileName, format, saveAll, sheets, selectedSheetIdx } = this.state;
    const timeStampedFileName: string = genString(fileName as string);
    if (!saveAll) {
      saveSheet([sheets[selectedSheetIdx]], timeStampedFileName, format);
      return;
    }
    saveSheet(sheets, timeStampedFileName, format);
  }

  render() {
    const { label, btn, sheets, selectedSheetIdx } = this.state;
    const sheetsData = <>
      <AppBar position="static" color="default">
        <Tabs
          value={selectedSheetIdx ?? 0}
          onChange={this.onTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {sheets.map((sheet, idx) => (
            <Tab
              key={'tab-header-' + idx}
              label={sheet.name}
              id={`scrollable-auto-tab-${idx}`}
              aria-controls={`scrollable-auto-tabpanel-${idx}`}
            />
          ))}
        </Tabs>
      </AppBar>
      { sheets.map((sheet, idx) => (
        <section
          key={'tab-field-' + idx}
          aria-labelledby={`scrollable-auto-tab-${idx}`}
          hidden={idx !== selectedSheetIdx}
          id={`scrollable-auto-tabpanel-${idx}`}
          role="tabpanel"
        >
          <section className="data-header">
            <TextField
              id={`s${idx}-name`}
              fullWidth
              label="Sheet name"
              value={sheet.name}
              variant="outlined"
              onChange={(e) => this.onChangeSheet(e, idx, 'name')}
            />
            {idx > 0 && (
              <Button
                color="secondary"
                disableElevation
                type="button"
                variant="contained"
                onClick={(e) => this.onRemoveSheet(e, idx)}
              ><RemoveCircleOutline /></Button>
            )}
          </section>
          <TextField
            id={`s${idx}-data`}
            fullWidth
            label="Sheet data"
            multiline
            rows={4}
            value={sheet.data}
            variant="outlined"
            onChange={(e) => this.onChangeSheet(e, idx)}
          />
        </section>
      )
      )}
    </>;

    return (
      <form onSubmit={this.saveData}>
        <section className="space-items">
          <h2>{label}</h2>
          <Button
            color="primary"
            disableElevation
            onClick={this.addSheet}
            size="small"
            type="button"
            variant="contained"
          ><AddCircleOutline /> Add new sheet</Button>
        </section>
        <section className="sheets">{sheetsData}</section>
        <section className="space-items">
          <FormControl>
            <TextField
              select
              defaultValue="txt"
              label="File type"
              name="format"
              onChange={this.onChangeFormat}
              variant="outlined"
            >
              <MenuItem value="csv">CSV</MenuItem>
              <MenuItem value="xlsx">Excel</MenuItem>
              <MenuItem value="txt">Text</MenuItem>
              <MenuItem value="zip">Zip</MenuItem>
            </TextField>
            <FormHelperText>File format to export</FormHelperText>
          </FormControl>
          <FormControlLabel
            control={<Checkbox color="primary" onChange={this.onChangeSaveAll} />}
            label="Save all sheets"
            labelPlacement="end"
          />
          <Button
            disableElevation
            color="primary"
            size="large"
            type="submit"
            variant="contained"
          >{btn}</Button>
        </section>
      </form>
    );
  }
}
