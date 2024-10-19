#include <vector>
#include <iostream>
#include <unordered_map>
#include <memory>
#include <sstream>
#include <optional>

using std::string, std::unordered_map, std::vector, std::pair;
using std::optional, std::nullopt, std::unique_ptr, std::make_unique;
using std::cin, std::cout, std::stringstream;

constexpr const auto MaxStreamSize = std::numeric_limits<std::streamsize>::max();

class Tag{
public:
    unordered_map<string, unique_ptr<Tag>> children;
    unordered_map<string, string> attributes{};
public:
    Tag& setAttribute(const string& name, const string& value) {
        attributes[name] = value;
        return *this;
    }
    
    optional<string> getAttribute(const string& name) {
        if(attributes.find(name) != attributes.end()) {
            return attributes[name];
        }
        return nullopt;
    }
    
    Tag* addChild(const string& name) {
        children[name] = make_unique<Tag>();
        return children[name].get();
    }
    
    optional<Tag*> getChild(const string& name) {
        if(children.find(name) != children.end()) {
            return children[name].get();
        }
        return nullopt;
    }
};

string removeSurroundingCharacters(const string& value) {
    // -2 because we are also shortening by 1 from the start
    return value.substr(1, value.length() - 2);
}

vector<pair<string, string>> getAttributePairs(stringstream &tagStream) {
    char c;
    string attrName{};
    string attrValue{};
    bool captureValue = false;
    
    vector<pair<string, string>> attrPairs{};

    while(tagStream >> c) {
        if(c == ' ' || c == '=') {
            continue;
        } else if(c == '"') {
            if(captureValue) {
                attrPairs.emplace_back(attrName, attrValue);
                attrName = attrValue = "";
            }
            captureValue = !captureValue;
        } else if(captureValue){
            attrValue += c;
        } else {
            attrName += c;
        }
    }

    return attrPairs;
}

Tag* addTagChild(Tag* parent, const string& inputLine) {
    // skips the < and >
    auto lineWithoutBrackets = removeSurroundingCharacters(inputLine);
    auto inputStringStream = stringstream(lineWithoutBrackets);
    
    string tagName{};
    inputStringStream >> tagName;
    auto tag = parent->addChild(tagName);
    
    auto attrPairs = getAttributePairs(inputStringStream);
    
    for(const auto &[name, value] : attrPairs) {
        tag->setAttribute(name, value);
    }
    
    return tag;
}

string queryDocument(Tag* document, const string& queryString) {
    const auto notFoundQuery = "Not Found!";
    auto queryStringStream = stringstream(queryString);
    string nestedTagString, attributeName;
    getline(queryStringStream, nestedTagString, '~');
    getline(queryStringStream, attributeName, '~');
    
    Tag* tag = document;
    auto nestedTagsStringStream = stringstream(nestedTagString);
    string word;
    while(getline(nestedTagsStringStream, word, '.')) {
        auto ret = tag->getChild(word);
        if(!ret.has_value()) {
            return notFoundQuery;
        }
        tag = ret.value();
    }
    
    return tag->getAttribute(attributeName).value_or(notFoundQuery);
}

int main() {
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   
    int N, Q;
    cin >> N >> Q;
    cin.ignore(MaxStreamSize, '\n');
    
    auto document = make_unique<Tag>();
    vector<Tag*> tags{document.get()};
    
    for(int i = 0; i < N; i++) {
        string tagLine;
        getline(cin, tagLine);
        
        if(tagLine.find("</") == 0) {
            tags.pop_back();
        } else {
            auto parent = tags.back();
            tags.push_back(addTagChild(parent, tagLine));
        }
    }
    
    for(int i = 0; i < Q; i++) {
        string queryLine;
        getline(cin, queryLine);
        
        cout << queryDocument(document.get(), queryLine) << "\n";
    }
    
    return 0;
}

// Sample input:
// 4 3                           - how many lines of tags, how many queries
// <tag1 value = "HelloWorld">   - tag opened
// <tag2 name = "Name1">         - child tag opened
// </tag2>                       - child tag closed
// </tag1>                       - tag closed
// tag1.tag2~name                - query name of child
// tag1~name                     - query name of tag
// tag1~value                    - query value of tag

// Sample output:
// Name1
// Not Found!
// HelloWorld
