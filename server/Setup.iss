#define MyAppName "9 Movies"
#define MyAppVersion "1.0.0"
#define MyAppExeName "9-movies.exe"

[Setup]
AppId={{E2F27654-6FEC-4798-B2D1-769A6D7148DE}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppVerName={#MyAppName} {#MyAppVersion}
DefaultDirName={pf}\{#MyAppName}
DefaultGroupName={#MyAppName}
OutputBaseFilename=Setup
Compression=lzma
SolidCompression=yes
MinVersion=0,6.1

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"

[Files]
Source: "9-movies-x86.exe"; DestDir: "{app}"; DestName: "{#MyAppExeName}"; Flags: ignoreversion; Check: not IsWin64; AfterInstall: SetElevationBit('{app}\{#MyAppExeName}')
Source: "9-movies-x64.exe"; DestDir: "{app}"; DestName: "{#MyAppExeName}"; Flags: ignoreversion; Check: IsWin64; AfterInstall: SetElevationBit('{app}\{#MyAppExeName}')
Source: "icon.ico"; DestDir: "{app}"; Flags: ignoreversion
Source: ".env"; DestDir: "{app}"; Flags: ignoreversion
Source: "bin\*"; DestDir: "{app}\bin"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; IconFilename: "{app}\icon.ico"; AfterInstall: SetElevationBit('{group}\{#MyAppName}.lnk')
Name: "{group}\{cm:UninstallProgram,{#MyAppName}}"; Filename: "{uninstallexe}"
Name: "{commondesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; IconFilename: "{app}\icon.ico"; Tasks: desktopicon; AfterInstall: SetElevationBit('{commondesktop}\{#MyAppName}.lnk')
Name: "{commonstartup}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; IconFilename: "{app}\icon.ico"; AfterInstall: SetElevationBit('{commonstartup}\{#MyAppName}.lnk')

[Dirs]
Name: "{code:GetMediaDir}\Movies"; Flags: uninsneveruninstall
Name: "{code:GetMediaDir}\Series"; Flags: uninsneveruninstall
Name: "{code:GetMediaDir}\Music"; Flags: uninsneveruninstall
Name: "{code:GetMediaDir}\Applications"; Flags: uninsneveruninstall
Name: "{code:GetMediaDir}\Games"; Flags: uninsneveruninstall

[UninstallDelete]
Type: filesandordirs; Name: "{app}"

[Code]
var
  MediaDirPage: TInputDirWizardPage;

procedure InitializeWizard();
begin
  MediaDirPage := CreateInputDirPage(wpSelectDir,
    'Select Media Location', 'Where should media files be stored?',
    'Media files will be stored in the following folder.'#13#10#13#10 +
    'To continue, click Next. If you would like to select a different folder, click Browse.',
    False, '');
  MediaDirPage.Add('');
  MediaDirPage.Values[0] := GetPreviousData('MediaDir', 'C:\Media');
end;

procedure RegisterPreviousData(PreviousDataKey: Integer);
begin
  SetPreviousData(PreviousDataKey, 'MediaDir', MediaDirPage.Values[0]);
end;

procedure CurStepChanged(CurStep: TSetupStep);
begin
  if CurStep = ssPostInstall then
  begin
    SaveStringToFile(ExpandConstant('{app}\.env'), 'MEDIA_DIR=' + MediaDirPage.Values[0], True);
  end;
end;

function GetMediaDir(Param: String): String;
begin
  Result := MediaDirPage.Values[0];
end;

procedure SetElevationBit(Filename: string);
var
  Buffer: string;
  Stream: TStream;
begin
  Filename := ExpandConstant(Filename);
  Log('Setting elevation bit for ' + Filename);

  Stream := TFileStream.Create(FileName, fmOpenReadWrite);
  try
    Stream.Seek(21, soFromBeginning);
    SetLength(Buffer, 1);
    Stream.ReadBuffer(Buffer, 1);
    Buffer[1] := Chr(Ord(Buffer[1]) or $20);
    Stream.Seek(-1, soFromCurrent);
    Stream.WriteBuffer(Buffer, 1);
  finally
    Stream.Free;
  end;
end;
