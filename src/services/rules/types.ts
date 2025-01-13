export interface Node {
  id: string;
  name: string;
  type: string;
}

export interface RulesResponse {
  contentType: string;
  nodes: Node[];
}
